async function getParkTypes() {
    let url = 'https://uptacamp.github.io/session_two/assets/scripts/data/park_types.json';
    try {
        let park_types = await(fetch(url));
       
       // await res2.json();
            
       console.log(park_types);
    } catch (error) {
        console.log(error);
    }
}