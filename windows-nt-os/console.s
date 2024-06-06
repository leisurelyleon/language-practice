section .data
    hello db 'Windows NT in Assembly!', 0

section .text
    global _start

_start:
    ; Write to console
    mov eax, 4              ; sys_write system call number
    mov ebx, 1              ; file descriptor: STDOUT
    mov ecx, hello          ; message to write 
    mov edx, 29             ; message length
    int 0x80                ; interrupt to invoke system call

    ; Exit
    mov eax, 1              ; sys_exit system call number
    xor ebx, ebx            ; exit code 0
    int 0x80                ; interrupt to invoke system call