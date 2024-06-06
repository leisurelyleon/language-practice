#include <windows.h>

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam);

int WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow) {
    // Register the window class
    WNDCLASSEX wc = { sizeof(WNDCLASSEX), CS_CLASSDC, WindowProc, 0L, 0L, GetModuleHandle(NULL), NULL, NULL, NULL, _T("MyWindowClass"), NULL };
    RegisterClassEx(&wc);

    // Create the window
    HWND hwnd = CreateWindow(wc.lpszClassName, _T("Windows NT App"), WS_OVERLAPPEDWINDOW, 100, 100, 800, 600, NULL, NULL, wc.hInstance, NULL);

    // Show the window
    ShowWindow(hwnd, nCmdShow);
    UpdateWindow(hwnd);

    // Message loop
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    return msg.wParam;
}

LRESULT CALLBACK WindowProc(HWND hwnd, UINT uMsg, WPARAM wParam, LPARAM lParam) {
    switch (uMsg) {
        case WM_DESTROY:
            PostQuitMessage(0);
            return ;
        default:
            return DefWindowProc(hwnd, uMsg, wParam, lParam);
    }
}