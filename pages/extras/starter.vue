<script>
/**
 * Starter component
 */
export default {
    head() {
        return {
            title: `${this.title} | SmartHRIS - Aplikasi HR lengkap dari BSA`
        }
    },
    data() {
        return {
            title: 'Starter',
            items: [{
                    text: 'SmartHRS',
                    href: '/',
                },
                {
                    text: 'Pages',
                    href: '/',
                },
                {
                    text: 'Starter',
                    active: true,
                },
            ],
        }
    },
    middleware: 'router-auth'
}
</script>

<template>
<div>
    <PageHeader :title="title" :items="items" />
</div>
</template>
