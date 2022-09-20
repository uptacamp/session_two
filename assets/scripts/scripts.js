    async function getParks() {
        let url = 'https://uptacamp.github.io/session_two/assets/scripts/data/national_parks.json';
        try {
            let res = await fetch(url);
            return await res.json();
            
        } catch (error) {
            console.log(error);
        }
    }
    
    async function displayParks() {
        let parks_result = await getParks();
        
        for (let i = 0; i < parks_result.parks.length; i++){
            console.log(parks_result.parks[i].Address);
        }
        
        //return parks_result.parks[0].Address;
        }
    
        
    
   displayParks();
    


    