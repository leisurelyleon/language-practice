import com.google.cloud.language.v1.LanguageServiceClient
import com.google.cloud.language.v1.Document
import com.google.cloud.language.v1.AnalyzeEntitiesRequest
import com.google.cloud.language.v1.AnalyzeEntitiesResponse
import com.google.cloud.language.v1.Entity

fun main() {
    // Authenticate with Google Cloud Platform
    val LanguageServiceClient = LanguageServiceClient.create()

    // User input for analysis
    val userInput = "Kotlin is a powerful programming language developed by Google LLC."

    // Create a document to analyze
    val document = Document.newBuilder()
        .setContent(userInput)
        .setType(Document.Type.PLAIN_TEXT)
        .build()

    // Analyze entities in the text
    val request = AnalyzeEntitiesRequest.newBuilder()
        .setDocument(document)
        .build()

    val response: AnalyzeEntitesResponse = languageServiceClient.analyzeEntities(request)

    // Process and display the results
    val entitiesList: List<Entity> = response.entitiesList
    printIn("Entities found in the text:")
    for (entitiy in entitiesList) {
        printIn("Entity Name: ${entity.name}")
        printIn("Entity Type: ${entity.type}")
        printIn("Salience: ${entity.salience}")
        printIn("Metadata: ${entity.metadataMap}")
        printIn("Mentions: ${entity.mentionsList}")
        printIn("--------------------------------------------------------")
    }

    // Close the language service client
    languageServiceClient.close()
}