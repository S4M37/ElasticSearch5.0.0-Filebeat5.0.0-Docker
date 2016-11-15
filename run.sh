#!/bin/bash

echo "server started"


addgroup sudo
adduser elasticsearch sudo

echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

chown -R elasticsearch:elasticsearch /usr/share/elasticsearch/data

# allow for memlock
ulimit -l unlimited


#run filebeat
#/etc/init.d/filebeat start

#run elasticsearch
sudo -H -u elasticsearch /usr/share/elasticsearch/bin/elasticsearch







