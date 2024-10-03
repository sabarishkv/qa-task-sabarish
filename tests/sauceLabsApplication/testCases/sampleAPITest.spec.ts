
/*
curl -X 'GET' \
  'https://catfact.ninja/facts?max_length=100&limit=5' \
  -H 'accept: application/json' \
  -H 'X-CSRF-TOKEN: ycvP9x0i2pPoazDbScNAk0C3YDqIe4yPi9b19xEL'

  */



  const max_length = 100;
  const limit = 5;
  import { test, expect } from '@playwright/test';
  
  test(`3. Get a list of facts @smoke @regression @api`, async ({ request }) => {
      // Sending the GET request
      const response = await request.get('https://catfact.ninja/facts', {
          params: {
              max_length: max_length,
              limit: limit
          },
          headers: {
              Accept: 'application/json',
              'X-CSRF-TOKEN': 'ycvP9x0i2pPoazDbScNAk0C3YDqIe4yPi9b19xEL'
          },
      });
  
      // Verify the status code is 200
      expect(response.status()).toBe(200);
  
      // Parse and print the JSON response
      var responseBody = JSON.parse(await response.text());
  
      console.log(responseBody);
      expect(responseBody.data).toBeInstanceOf(Array);
  
      for (const breed of responseBody.data) {
          console.log(breed);
          const fact: string = breed.fact;
          const length = breed.length;
          expect(fact.length).toBe(length);
      }
      expect(responseBody.data.length).toBe(limit);
  
  });

  test.only(`4. Get a list of facts @smoke @regression @api`, async ({ request }) => {
    // Sending the GET request
    const response = await request.get('https://catfact.ninja/facts', {
        params: {
            max_length: max_length,
            limit: limit
        },
        headers: {
            Accept: 'application/json',
            'X-CSRF-TOKEN': 'ycvP9x0i2pPoazDbScNAk0C3YDqIe4yPi9b19xEL'
        },

        
    });

    // Verify the status code is 200
    expect(response.status()).toBe(200);

    // Parse and print the JSON response
    var responseBody = JSON.parse(await response.text());

    console.log(responseBody);
    // expect(responseBody.data).toBeInstanceOf(Array);

    // for (const breed of responseBody.data) {
    //     console.log(breed);
    //     const fact: string = breed.fact;
    //     const length = breed.length;
    //     expect(fact.length).toBe(length);
    // }
    // expect(responseBody.data.length).toBe(limit);

});