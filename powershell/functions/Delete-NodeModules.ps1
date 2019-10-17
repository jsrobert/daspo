
Function Delete-NodeModules {
    # Get the node_modules folder then remove it
    $node_modules = Get-ChildItem -Filter "node_modules"
    "Found the node_modules folder"
    $node_modules.FullName

    "Deleting node_modules folder"
    Remove-Item -Path $node_modules.FullName -Recurse -Force
}

Delete-NodeModules