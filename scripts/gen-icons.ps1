Add-Type -AssemblyName System.Drawing

function New-HopeIcon {
  param([int]$Size, [string]$Path)
  $bmp = New-Object System.Drawing.Bitmap $Size, $Size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::FromArgb(255, 63, 74, 46))
  $cream = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 247, 244, 238))
  $mustard = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(255, 232, 185, 45))
  $cx = $Size / 2
  $cy = $Size / 2
  $r = $Size * 0.18
  $g.FillEllipse($cream, $cx - $r, $cy - $Size * 0.28, $r * 2, $r * 2)
  $pen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(255, 247, 244, 238), ($Size * 0.06))
  $pen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
  $pen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
  $g.DrawArc($pen, $cx - $Size * 0.28, $cy - $Size * 0.08, $Size * 0.56, $Size * 0.45, 200, 140)
  $g.FillEllipse($mustard, $Size * 0.72, $Size * 0.72, $Size * 0.16, $Size * 0.16)
  $g.Dispose()
  $bmp.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  $bmp.Dispose()
}

$brand = Join-Path $PSScriptRoot "..\public\brand"
New-HopeIcon 192 (Join-Path $brand "icon-192.png")
New-HopeIcon 512 (Join-Path $brand "icon-512.png")
New-HopeIcon 180 (Join-Path $brand "apple-touch-icon.png")
New-HopeIcon 32 (Join-Path $brand "favicon-32.png")

$og = New-Object System.Drawing.Bitmap 1200, 630
$ogG = [System.Drawing.Graphics]::FromImage($og)
$ogG.Clear([System.Drawing.Color]::FromArgb(255, 63, 74, 46))
$f = New-Object System.Drawing.Font "Arial", 72, ([System.Drawing.FontStyle]::Bold)
$brush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)
$ogG.DrawString("HOPE Bridge", $f, $brush, 80, 240)
$ogG.Dispose()
$og.Save((Join-Path $brand "og-image.png"), [System.Drawing.Imaging.ImageFormat]::Png)
$og.Dispose()

Write-Host "icons ok"
Get-ChildItem (Join-Path $brand "*.png") | ForEach-Object { Write-Host $_.Name $_.Length }
