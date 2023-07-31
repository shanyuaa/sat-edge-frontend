#!/bin/zsh
version=$(cat version)
version=$(awk 'BEGIN{print "'$version'"+0.1}')
sudo docker stop fe
sudo docker rm fe

sudo docker build -t fe:$version .

sudo docker tag fe:$version harbor.act.buaa.edu.cn/sat-edge-manager/fe:$version

sudo docker push harbor.act.buaa.edu.cn/sat-edge-manager/fe:$version

echo $version > version

git commit -am "auto increase version"

git push