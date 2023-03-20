@echo off

:nc

if exist "./src/Components/%~2/" (
    echo File '%~2' already exists...
    EXIT /B 1
) else (
    mkdir "./src/Components/%~2/"

    >"./src/Components/%~2/%~2.js" (
    for %%I in (
        "import React from "react";"
        "import "./style.scss";"
        echo.
        "function %~2() {"
        echo.
        "   return ("
        "       <div id="%~2" className="page"></div>"
        "   );"
        "}"
        echo.
        "export default %~2;"
    ) do if "%%~I" == "echo." ( echo. ) else ( echo %%~I )
    )
    echo File '%~2.js' created at "./src/Components/%~2/%~2.js"

    >"./src/Components/%~2/style.scss" (
    for %%I in (
        "#%~2 {}"
    ) do if "%%~I" == "echo." ( echo. ) else ( echo %%~I )
    )
    echo File 'style.scss' created at "./src/Components/%~2/style.scss"
)

EXIT /B 0
