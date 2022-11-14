sudo rm -r /var/lib/bluetooth/mesh/07010e0408020f0c03050b0a0d0a0906
sudo cp -r /home/pi/project/src/07010e0408020f0c03050b0a0d0a0906/ /var/lib/bluetooth/mesh/

sudo systemctl stop bluetooth
sudo systemctl start bluetooth-mesh

node wsServer.js &
python3 server.py
