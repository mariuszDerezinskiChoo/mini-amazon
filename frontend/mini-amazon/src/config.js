const hostname = window && window.location && window.location.hostname;

let backend;

if(hostname === 'localhost'){
    backend = 'http://vcm-16363.vm.duke.edu:5000'
} else {
    backend = 'http://vcm-16363.vm.duke.edu:5000'
}

export default backend;