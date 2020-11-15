const hostname = window && window.location && window.location.hostname;

let backend;
/*
Temporary fix for now until we can get netlify transferred over from jimmy's account
This isn't the most ideal fix, but I've confirmed it does NOT violate any security
best practices since all of the information placed here could be visible in the
network tab. The worst thing somebody could do with this informationn is make an account
in our beta stage, but that would serve them no good
*/
if(hostname === 'localhost'){
    backend = 'http://127.0.0.1:5000/'
} else {
    backend = 'http://vcm-16363.vm.duke.edu:5000/'
}

export default backend;