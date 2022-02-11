---
layout: post
title: "wakeonlan server"
date: "2021-12-12 10:18:10 +0100"
tags: suspend, wakeonlan, hibernate, ubuntu
---

Commands are for ubuntu.

# Check hardware capability

To see if card is able to be "awaken":

~~~bash
sudo ethtool eth0  | egrep "^[[:blank:]]*Wake-on: (g|d)"
~~~

if `g`, it is activated, if `d`, this is possible but not activated.

See https://doc.ubuntu-fr.org/wakeonlan for more information.

# Put server in hibernation or suspend it

For me, suspending activity is enough. It will consume power but will be accessible in few seconds.

See https://www.cyberciti.biz/faq/linux-command-to-suspend-hibernate-laptop-netbook-pc/

By pressing power button, the machine will be suspended or resumed (if already suspended)

Now, how to suspend it?

I would like to manually suspend it by pressing power button.

So `systemctl suspend` would be enough.

## disabling systemd management


~~~bash
sudo sed -i s/".*HandlePowerKey.*"/"HandlePowerKey=ignore"/ /etc/systemd/logind.conf
reboot
~~~

Source: http://www.fit-pc.com/wiki/index.php/Application_note_-_Example_code_for_capturing_power_button_event_on_fitlet2_running_Linux

## Setting acpi

sudo apt install acpid-support

Edit or create file : /etc/acpi/events/power

~~~
event=button/power
action=/etc/acpi/power.sh
~~~

Create file : /etc/acpi/power.sh

~~~bash
#!/bin/sh
systemctl suspend
~~~

then:

~~~console
chmod +x /etc/acpi/power.sh
~~~


then restart the service:

~~~
sudo service acpid restart
~~~

Hint, if this is still not working, this is probably due to the event name.

To capture it you can run `acpi_listen` on the machine to see if event name is ok.

In my case, I was trying event `/button/power` but it works only with `power (PBTN)`

# Setting remote wakeonlan

By default i've set my router like this:

* redirect 8009 port to wol port (9)
* redirect this steam onto my specific miniserver via udp


And that's all!

I can use : https://www.depicus.com/wake-on-lan/woli

And then provide my mac adress and ip with port 8009 and that's enough.

A simple alias would be:

~~~
alias wolminiserver='wakeonlan -i $(dig +short my_host_name) -p 8009 my_mac_address
~~~

Note the dig that allows to get ip from hostname ;)


