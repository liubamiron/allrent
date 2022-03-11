export default {
    mounted(el, binding) {
        // console.log(el, binding);
        const options = {
          rootMargin: '0px',
          threshold: 1.0
        }

        const callback = (entries, observer) => {
          // if (entries[0].isIntersecting && this.page < this.totalPages){
              if (entries[0].isIntersecting){
            console.log('intersected');
            binding.value()
          }
        };
        const observer = new IntersectionObserver(callback, options);
        observer.observe(el);
    },
    name: 'intersection'
}