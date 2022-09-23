    let mountain_result = {};
    
    //retrieve mountain list from json file

    async function getMountains() {
        let url = 'https://uptacamp.github.io/session_two/assets/scripts/data/mountains.json';
        try {
            let res = await fetch(url);
            return await res.json();
            
        } catch (error) {
            console.log(error);
        }
    }
    
    //from the parks json file, build the locations drop down
    async function buildMountainsDropDown() {
        mountain_result = await getMountains();  
        let mtn_list = [];
        let mtn_dropdown = $('#mtn_dropdown');
        mtn_dropdown.empty();
        mtn_dropdown.append('<option selected="true">Select Option</option>');
        mtn_dropdown.prop('selectedIndex', 0);
        
        //cycle through json file to build a sorted drop down list with no dupes
        for (let i = 0; i < mountain_result.mountains.length; i++){
            current_mtn = mountain_result.mountains[i].name;
            
            if (mtn_list.indexOf(current_mtn) > -1 ){
                //if already in the list, do nothing
                } else {
                //if not in the list, add it to array
                mtn_list.push(current_mtn);
                mtn_list.sort();
                }
        }
        mtn_list.forEach(addToDropDown)

        function addToDropDown(item) {
            mtn_dropdown.append($('<option></option>').attr('value', item).text(item));
         } 
        
    }

    function DisplaySelectedMountain (byLocation, byType){
        //filter full JSON file by whatever is selected and add to webpage
        let selected_mtn = $('#mtn_dropdown').val();
        
        //$('#mountain_info_section').empty();
        let matching_results = [];

        for (let i = 0; i < mountain_result.mountains.length; i++){
            
                current_mtn = mountain_result.mountains[i].name;
                
                if (selected_mtn == current_mtn){
                    //add to results array
                    matching_results.push(mountain_result.mountains[i]);
                } 
            }

        //display matching results on screen
        console.log(matching_results);
       
            $('#mtn_name').removeAttr('hidden');
            $('#mtn_name').html('');
            $('#mtn_name').html('<strong>Name:</strong> ' + matching_results[0].name);
            $('#mtn_elevation').removeAttr('hidden');
            $('#mtn_elevation').html('');
            $('#mtn_elevation').html('<strong>Elevation:</strong> ' + matching_results[0].elevation + "ft.");
            $('#mtn_effort').removeAttr('hidden');
            $('#mtn_effort').html('');
            $('#mtn_effort').html('<strong>Effort:</strong> ' + matching_results[0].effort);
            $('#mtn_description').removeAttr('hidden');
            $('#mtn_description').html('');
            $('#mtn_description').html('<strong>Description:</strong>' + matching_results[0].desc);
            $('#mtn_coordinates').removeAttr('hidden');
            $('#mtn_coordinates').html('');
            $('#mtn_coordinates').html('<strong>Coordinates:</strong> ' + matching_results[0].coords.lat +", " + matching_results[0].coords.lng);
            
        }
   
    //load the page dropdowns
    buildMountainsDropDown();
    
    


    
    