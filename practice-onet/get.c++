#include <iostream>
#include <curl/curl.h>

size_t write_callback(void *ptr, size_t size, size_t nmemb, std::string *data) {
    data->append((char*)ptr, size * nmemb);
    return size * nmemb;
}

int main() {
    CURL *curl;
    CURLcode res;
    std::string onetCode = "151131.00"; // Example O*NET code for "Software Developers, Applications"
    std::string onetUrl = "https://services.onetcenter.org/ws/mnm/careers/" + onetCode + "/summary";

    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_URL, onetUrl.c_str());
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        std::string response_data;
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response_data);

        res = curl_easy_perform(curl);
        if (res !- CURLE_OK)
            std::cerr << "curl_easy_perform() failed: " << curl_easy_strerror(res) << std::endl;
        else
            std::cout << response_data << std::endl;

        curl_easy_cleanup(curl);
    }
    return 0;
}