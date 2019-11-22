npm cache clean --force

#cd $env:APPDATA\npm-cache
Set-Location $env:HOMEPATH
Get-ChildItem -Directory -Recurse -Include node_modules | Sort-Object -Property FullName | Select-Object -Property FullName

$scriptsDir = Get-ChildItem -Directory -Recurse -Include scripts
write-Output "Scripts directory = $scriptsDir"

Get-ChildItem -Directory -Recurse -Include event-stream | Remove-Item
Get-ChildItem -Directory -Recurse -Include flatmap-stream | Remove-Item

"Looking for node_module folders" 

$sourceFolders = Get-ChildItem -Directory
foreach($sf in $sourceFolders) {
    $nm = Get-ChildItem -Path $_.Name -Directory
    $nm.FullName
}

$dirs = Get-ChildItem -Directory | ForEach-Object { $_.GetDirectories("node_modules") } | ForEach-Object { $_.FullName }
$dirs | ForEach-Object { Remove-Item $_ -Recurse -Force }
Get-ChildItem -Directory -Filter node_modules -Recurse | ForEach-Object { Remove-Item $_.FullName -Recurse -Force }
Get-ChildItem -Directory -Filter node_modules -Recurse 

Get-ChildItem -Directory | ForEach-Object { Get-ChildItem $_.Name -Directory -Recurse -Include event-stream } | ForEach-Object { $_.FullName }
Get-ChildItem -Directory | ForEach-Object { Get-ChildItem $_.Name -Directory -Recurse -Include node_modules } | ForEach-Object { Remove-Item $_.FullName -Recurse -Force }

$topLevelNodeModules = Get-ChildItem -Filter node_modules -ErrorAction SilentlyContinue

foreach($nodeModule in $topLevelNodeModules){
 $nodeModule.FullName
}

foreach($module in $modules){
    if($module){
        "event-stream module found" 
        Remove-Item $module -Recurse
    }
    Get-ChildItem -Path $env:PUBLIC
}