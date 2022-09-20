    
    
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
        let state_list = [];
        let dropdown = $('#by_location');
        
        dropdown.empty();
        dropdown.append('<option selected="true" disabled>Choose State</option>');
        dropdown.prop('selectedIndex', 0);
        
        //cycle through
        for (let i = 0; i < parks_result.parks.length; i++){
            current_state = parks_result.parks[i].State;
            
            //populate location drop down

        if (state_list.indexOf(current_state) > -1 ){
            //if already in the list, do nothing
        } else
        {
            //if not in the list, add it to array
            state_list.push(current_state);
            
            dropdown.append($('<option></option>').attr('value', parks_result.parks[i].State).text(parks_result.parks[i].State));
        }
         
        }
        console.log(state_list);
       
        }
    
        
    
   displayParks();
    


    