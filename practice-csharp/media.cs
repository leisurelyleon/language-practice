using System;
using System.Collections.Generic;

class Media
{
    public string Title { get; set; }
    public string FilePath { get; set; }
    public List<string> Tags { get; set; }

    public Media(string title, string filePath, List<string> tags)
    {
        Title = title;
        FilePath = filePath;
        Tags = tags;
    }
}

class MediaLibrary
{
    private List<Media> mediaCollection;

    public MediaLibrary()
    {
        mediaCollection = new List<Media>();
    }

    public void AddMedia(string title, string filePath, List<string> tags)
    {
        Media newMedia = new Media(title, filePath, tags)
        mediaCollection.Add(newMedia);
        Console.writeLine($"Added new media: {newMedia.Title}");
    }

    public void DisplayMediaList()
    {
        Console.WriteLine("Media Library:");
        foreach (var media in mediaCollection)
        {
            Console.WriteLine($"Title: {media.Title}, FilePath: {media.FilePath}, Tags: {string.Join(", ", media.Tags)}");
        }
    }
}

class MediaPlayer
{
    private MediaLibrary mediaLibrary;

    public MediaPlayer(MediaLibrary library)
    {
        mediaLibrary = library;
    } 

    public void PlayMedia(string title)
    {
        Media mediaToPlay = mediaLibrary.GetMediaByTitle(title);

        if (mediaToPlay != null)
        {
            Console.WriteLine($"Playing media: {mediaToPlay.Title} from {mediaToPlay.FilePath}");
        }
        else
        {
            Console.WriteLine($"Media with title '{title}' not found in the library.");
        }
    }
}

class Program
{
    static void Main()
    {
        // Create a media library
        MediaLibrary library = new MediaLibrary();

        // Add some media to the library
        library.AddMedia("Song 1", "C:\\Music\\song1.mp3", new List<string> { "Music", "Pop" });
        library.AddMedia("Video 1", "C:\\Videos\\video1.mp4", new List<string> { "Movie", "Action" });

        // Display the media library
        library.DisplayMediaList();

        // Create a media player
        MediaPlayer player = new MediaPlayer(library);

        // Play some media
        player.PlayMedia("Song 1");
        player.PlayMedia("Nonexistent Media");

        Console.ReadLine();
    }
}