<template>
    <v-container>
        <v-subheader class="orange darken-1 black--text">Summary of Something</v-subheader>
        <v-data-table
            :headers="headers"
            :items="records"
            :items-per-page="5"
            
            ></v-data-table>
    </v-container>
</template>

<script>
export default {
    name: "ViewSummary",
    data: () => ({
        headers: [
            {
                text: 'Col1',
                align: 'left',
                sortable: false,
                value: 'col1',
            },
            {text: 'Col2', value: 'col2'},
            {text: 'Col3', value: 'col3'},
        ],
        records: [
            {
                col1: 'a',
                col2: 'b',
                col3: 'c'
            },
            {
                col1: 'd',
                col2: 'e',
                col3: 'f'
            }
        ]
  }),

};
</script>