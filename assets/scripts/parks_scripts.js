    
    
    let parks_result = {};
    let park_types = [];
  
    //retrieve parks json file - the primary file driving this page
    async function getParks() {
        let url = 'https://uptacamp.github.io/session_two/assets/scripts/data/national_parks.json';
        try {
            let res = await fetch(url);
            return await res.json();
            
        } catch (error) {
            console.log(error);
        }
    }
    
    //from the parks json file, build the locations drop down
    async function buildLocationsDropDown() {
        parks_result = await getParks();      
        let state_list = [];
        let location_dropdown = $('#by_location');
        location_dropdown.empty();
        location_dropdown.append('<option selected="true">All</option>');
        location_dropdown.prop('selectedIndex', 0);
        
        //cycle through json file to build a sorted drop down list with no dupes
        for (let i = 0; i < parks_result.parks.length; i++){
            current_state = parks_result.parks[i].State;
            
            if (state_list.indexOf(current_state) > -1 ){
                //if already in the list, do nothing
                } else {
                //if not in the list, add it to array
                state_list.push(current_state);
                state_list.sort();
                }
        }
        
        state_list.forEach(addToDropDown)

        function addToDropDown(item) {
            location_dropdown.append($('<option></option>').attr('value', item).text(item));
         } 
       //console.log(state_list);
    }

    //retrieve park types json file - the secondary file driving this page
    async function getParkTypes() {
        let url = 'https://uptacamp.github.io/session_two/assets/scripts/data/park_types.json';
        try {
            let res = await(fetch(url));
            let data = await res.json()
          //  console.log(park_types);
            return(data);
        } catch (error) {
            console.log(error);
        }
    }   

    //from the types json file - build the park type drop down
    async function buildParkTypesDropDown() {
        park_types = await getParkTypes();      
        console.log(park_types)
        let type_dropdown = $('#by_type');
        type_dropdown.empty();
        type_dropdown.append('<option selected="true">All</option>');
        type_dropdown.prop('selectedIndex', 0);  
        park_types.forEach(addToDropDown)

        function addToDropDown(item) {
            type_dropdown.append($('<option></option>').attr('value', item).text(item));
         } 
     
        }

    function DisplayFilteredParksList (byLocation, byType){
        //filter full JSON file by whatever is selected and add to webpage
        let query_state = $('#by_location').val();
        let query_type = $('#by_type').val();
       
        $('#parks_results_table').empty();
        let matching_results = [];

        for (let i = 0; i < parks_result.parks.length; i++){
            if (query_state == "All" && query_type == "All" ) {
                alert("please narrow your search")
                break;
            } else if (query_state == "All" && query_type !== "All") {
                //if only park type search is used, build results list only by park type
                current_name = parks_result.parks[i].LocationName;
                if (current_name.toLowerCase().includes(query_type.toLowerCase())){
                //search by type 
                   matching_results.push(parks_result.parks[i]);
                } 
            } else if (query_state !== "All" && query_type == "All") {
               // search by state
                current_state = parks_result.parks[i].State;
                
                if (current_state == query_state){
                    //add to results array
                    matching_results.push(parks_result.parks[i]);
                } 
            } else {
                current_state = parks_result.parks[i].State;
                current_name = parks_result.parks[i].LocationName;
                if (current_state == query_state && current_name.toLowerCase().includes(query_type.toLowerCase())){
                    matching_results.push(parks_result.parks[i]);
                }
            }
        }

        //display matching results on screen
        console.log(matching_results);
        for (n = 0; n < matching_results.length; n++){
            $('#parks_results_table').append('<tr><td>' + matching_results[n].LocationName + ' ' + '</td> <td>' + matching_results[n].City + ' ' + '</td> <td>'+ matching_results[n].State + '</td></tr>');
        }
    }
   
    //load the page dropdowns
    buildLocationsDropDown();
    buildParkTypesDropDown();
    
    


    
    