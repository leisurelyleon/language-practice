.386
.model flat, stdcall
option casemap:none

include \masm32\include\windows.inc
include \masm\include\kernel32.inc
include \masm32\include\masm32.inc

includelib \masm32\lib\kernel32.lib
includelib \masm32\lib\masm32.lib

.data
devicePath db "\\\\.\\DevicePath", 0

.code
start:
  invoke CreateFile, addr devicePath, GENERIC_READ or GENERIC_WRITE, 0, NULL, OPEN_EXISTING, FILE_ATTRIBUTE_NORMAL, NULL
  mov hDevice, eax
  ; Check if the handle is valid
  cmp eax, INVALID_HANDLE_VALUE
  je failed

  ; If successful, perform device operations here
  ; ...

  failed:
    invoke ExitProcess, 0

  end start
  
