using System.Collections;
using UnityEngine;

public class EnemySpawner : MonoBehavior
{
    public GameObject enemyPrefab
    public Transform[] spawnPoints;
    public float timeBetweenWaves = 10f;
    public int enemiesPerWave = 5;
    private int waveCount = 0;

    void Start()
    {
        StartCoroutine(SpawnWaves());
    }

    IEnumerator SpawnWaves()
    {

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

    void SpawnEnemy()
    {
        int randomSpawnPointIndex = Random.Range(0, spawnPoints.Length);
        Transform spawnPoint = spawnPoints[randomSpawnPointIndex];
        Instantiate(enemyPrefab, spawnPoint.position, spawnPoint.rotation);
    }
}