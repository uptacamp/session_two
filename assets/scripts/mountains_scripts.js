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
        
        $('#mountain_info_section').empty();
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
        for (n = 0; n < matching_results.length; n++){
          //  $('#mountain_info_section').append('<tr><td>' + matching_results[n].LocationName + ' ' + '</td> <td>' + matching_results[n].City + ' ' + '</td> <td>'+ matching_results[n].State + '</td></tr>');
        }
    }

   
    //load the page dropdowns
    buildMountainsDropDown();
    
    


    
    