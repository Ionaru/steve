#!/usr/bin/env bash

apiKey=$2
buildType=$1

url="https://teamcity.saturnserver.org/app/rest/buildQueue"
data="<build><buildType id=\"${buildType}\"/></build>"
authHeader="Authorization: Bearer ${apiKey}"
contentHeader="Content-Type: application/xml"
originHeader="Origin: https://travis-ci.org"

curl -vvv -l ${url} --data "${data}" --header "${contentHeader}" --header "${authHeader}" --header "${originHeader}"
