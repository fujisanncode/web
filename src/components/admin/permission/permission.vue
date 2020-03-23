<template>
  <v-data-table :headers="headers" :items="sysPermissions" sort-by="name" class="elevation-1" v-model="selected" show-select>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>Psermission Manage</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn icon @click="syncPermission">
          <v-icon>sync</v-icon>
        </v-btn>
        <v-btn icon @click="queryNonPermission">
          <v-icon>remove_circle_outline</v-icon>
        </v-btn>
        <v-btn icon @click="saveRolePermissionBatch">
          <v-icon>check</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.id>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
</template>

<script src='./permisson.js'></script>