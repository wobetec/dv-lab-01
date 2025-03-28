<svelte:head>
    <title>Contact me</title>
</svelte:head>

<script>
    import Center from '$lib/Center.svelte';
</script>

<main>
    <Center>
        <h1>Send me a message</h1>
        <form action="contact">
            <input type="text" name="name" id="name" placeholder="Name">
            <input type="email" name="email" id="email" placeholder="Email">
            <textarea name="message" id="message" cols="30" rows="10" placeholder="Message"></textarea>
            <button type="submit">Send</button>
        </form>
    </Center>
</main>

<style>    
    form {
        display: flex;
        flex-direction: column;
        gap: 10px;
        margin: 20px auto;
        width: 80%;
    }

    form > input, form > textarea {
        padding: 5px;
        border-radius: 5px;
        border: 1px solid var(--border-color);
        font-size: 20px;
    }

    form > button {
        padding: 10px;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 5px;
        width: 20%;
        min-width: 100px;
        cursor: pointer;
    }
</style>
