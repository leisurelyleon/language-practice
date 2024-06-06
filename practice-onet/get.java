import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class OnetCodeFetcher {

    public static void main(String[] args) throws Exception {
        String onetCode = "151131.00"; // Example 0*NET code for Software Developers, Applications"
        String onetUrl = "https://services.onetcenter.org/ws/mnm/careers/" + onetCode + "/summary";

        URL url = new URL(onetUrl);
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        System.out.println(response.toString());
    }
}