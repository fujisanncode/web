<template>
  <v-data-table :headers="headers" :items="sysUsers" sort-by="name" class="elevation-1">
    <!-- 顶部插槽 -->
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>User Manage</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on">Add User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="用户名"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.password" label="密码"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- 行内插槽 -->
    <template v-slot:item.actions="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:item.name='{ item }'>
      <a href="javascript:void(0);" @click="findRole(item)">{{item.name}}</a>
    </template>
  </v-data-table>
</template>

<script src='./user.js'></script>