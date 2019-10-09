npm cache clean --force

#cd $env:APPDATA\npm-cache
cd $env:HOMEPATH
Get-ChildItem -Directory -Recurse -Include node_modules | Sort-Object -Property FullName | Select-Object -Property FullName
Get-ChildItem -Directory -Recurse -Include event-stream | Remove-Item
Get-ChildItem -Directory -Recurse -Include flatmap-stream | Remove-Item

"Looking for node_module folders" 

$sourceFolders = Get-ChildItem -Directory
foreach($sf in $sourceFolders) {
    $nm = Get-ChildItem -Path $_.Name -Directory
    $nm.FullName
}

$dirs = Get-ChildItem -Directory | % { $_.GetDirectories("node_modules") } | % { $_.FullName }
$dirs | % { Remove-Item $_ -Recurse -Force }
Get-ChildItem -Directory -Filter node_modules -Recurse | % { Remove-Item $_.FullName -Recurse -Force }
Get-ChildItem -Directory -Filter node_modules -Recurse 

Get-ChildItem -Directory | % { Get-ChildItem $_.Name -Directory -Recurse -Include event-stream } | % { $_.FullName }
Get-ChildItem -Directory | % { Get-ChildItem $_.Name -Directory -Recurse -Include node_modules } | % { Remove-Item $_.FullName -Recurse -Force }

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