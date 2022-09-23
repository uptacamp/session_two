
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