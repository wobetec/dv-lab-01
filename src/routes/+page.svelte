<svelte:head>
    <title>Home</title>
</svelte:head>

<script>
    import Center from '$lib/Center.svelte';
    import GitStats from '../lib/GitStats.svelte';
</script>

<main>
    <Center>
        <h1>This is my ninja way!</h1>
        <img src="https://s2-techtudo.glbimg.com/eu6NASx8EOPas6g9SjeMi7GFe-w=/1200x/smart/filters:cover():strip_icc()/i.s3.glbimg.com/v1/AUTH_08fbf48bc0524877943fe86e43087e7a/internal_photos/bs/2024/p/A/Z33KHnRcS95eaQ8d8axA/naruto-uzumaki-qabz-910x510.png" alt="Naruto">
        <GitStats username="wobetec"/>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque quis justo volutpat, sollicitudin lorem cursus, auctor erat. Ut mattis egestas lacinia. Donec orci dui, convallis eget odio vel, pulvinar viverra ex. Mauris urna tortor, consectetur sed tempor eu, luctus vel mi. Duis dignissim et justo pulvinar facilisis. Vivamus ac pretium ex. Nullam mollis massa nisl, at pulvinar ligula lobortis ac. Aenean molestie, lectus vel euismod convallis, lectus lorem tincidunt magna, vel posuere massa lectus eget massa. Cras malesuada condimentum rutrum. Curabitur hendrerit fringilla sodales. Vivamus bibendum libero quis eros semper vestibulum. Mauris ullamcorper purus in lacus ultricies tempor.</p>
        <p>Morbi eget maximus elit, id viverra dui. Suspendisse non condimentum purus. Ut sed sodales enim. Quisque sed libero at justo rhoncus bibendum. Donec commodo pulvinar enim, eu maximus turpis efficitur ac. Suspendisse ultricies dictum urna, in auctor ipsum ultrices at. Pellentesque eu nibh nulla. Donec odio tellus, dapibus sed nunc vitae, porta convallis ipsum. Nulla sed vestibulum tortor, sit amet ullamcorper erat. Proin ut elit metus. Maecenas ut ligula a enim laoreet scelerisque non ac lectus.</p>
    </Center>
</main>

<style>
    img {
        width: 50%;
        margin: 20px auto;
    }
    p {
        max-width: 800px;
        margin: 0 auto;
        padding: 10px;
        text-align: justify;
        text-indent: 30px;
    }
</style>