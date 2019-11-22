# Run in an elevated command prompt
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force

# run from an elevated PowerShell or Command prompt
npm install --global --production npm-windows-upgrade
npm-windows-upgrade

# to just install the latest version 
#npm-windows-upgrade --npm-version latest