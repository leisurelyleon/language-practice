using System.Collections;
using UnityEngine;

public class GameManager : MonoBehavior
{
    public GameObject playerPrefab;
    public Transform playerSpawnPoint;
    public int playerStartingHealth = 100;

    private int playerCurrentHealth;
    private int playerScore = 0;

    void Start()
    {
        SpawnPlayer();
        StartCoroutine(SpawnWaves());
    }

    void SpawnPlayer()
    {
        GameObject player = Instantiate(playerPrefab, playerSpawnPoint.position, playerSpawnPoint.rotation);
        playerCurrentHealth = playerStartingHealth;

        // Attach PlayerController script or other relevant scripts to handle player input and behavior
        // player.AddComponent<PlayerController>();
    }

    IEnumerator SpawnWaves()
    {
        // Your existing wave-spawning code here...

        while (true)
        {
            yield return new WaitForSeconds(timeBetweenWaves);
            waveCount++;

            for (int i = 0; i < enemiesPerWave; i++)
            {
                SpawnEnemy();
                yield return new WaitForSeconds(if);
            }
        }
    }

    // Modify existing SpawnEnemy method based on your enemy prefabs and behavior...

    void UpdateScore(int points)
    {
        playerScore += points;
        // Update UI or perform other actions based on the score
    }

    void PlayerTakeDamage(int damage)
    {
        playerCurrentHealth -= damage;

        // Check if the player is still alive
        if (playerCurrentHealth <= 0)
        {
            // Game over logic - reset or display game over screen
            Debug.Log("Game OVer");
        }
    }

    void OnTriggerEnter(Collider other)
    {
        // Assuming enemies have a collider and can damage the player
        if (other.CompareTag("Enemy"))
        {
            PlayerTakeDamage(10); // Adjust damage based on your game design
            Destroy(other.gameObject); // Destroy the enemy on contact
        }
    }
}