sudo systemctl stop bluetooth
sudo systemctl start bluetooth-mesh
while true
do
rm received.json
timeout 10 python3 server.py
done