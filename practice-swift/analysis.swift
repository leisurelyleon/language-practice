import NaturalLanguage

func performSentientAnalysis(userInput: String) {
    // Create a natural language processing tagger
    let tagger = NLTagger(tagSchemes: [.sentimentScore])

    // Set the input text for analysis
    tagger.string = userInput

    // Analyze sentiment
    let (sentiment, _) = tagger.tag(at: userInput.startIndex, unit: .paragraph, scheme: .sentimentScore)

    // Process and display the sentiment
    if let sentiment = sentiment, let sentimentScore = Double(sentiment.rawValue) {
        print("Sentiment Analysis Result:")
        print("Input Text: \(userInput)")
        print("Sentiment Score: \(sentimentScore)")
        print("Sentiment Category: \(getSentimentCategory(score: sentimentScore))")
    } else {
        print("Sentiment analysis failed.")
    }
}

func getSentimentCategory(score: Double) -> String {
    if score < -0.5 {
        return "Negative"
    } else if score > 0.5 {
        return "Positive"
    } else {
        return "Neutral"
    }
}

// Example of using the sentiment analysis function
let userInput = "Swift is a powerful and elegant programming language for iOS development."
performSentimentAnalysis(userInput: userInput)