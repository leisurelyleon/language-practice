.386
.model flat, stdcall
option casemap:none

include \masm32\include\windows.inc
include \masm32\include\kernel32.inc
include \masm32\include\user32.inc
include \masm32\include\masm32.inc

include \masm32\lib\kernel32.lib
include \masm32\lib\user32.lib
include \masm32\lib\masm32.lib

.data
MsgBoxCaption db "Windows Hello Example", 0
MsgBoxText db "Hello, Windows!", 0

.code
start:
  invoke MessageBox, NULL, addr MsgBoxText, addr MsgBoxCaption, MB_OK
  invoke Exit Process, 0
end start
