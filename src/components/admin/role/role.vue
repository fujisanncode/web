<template>
  <v-data-table :headers="headers" :items="sysRoles" sort-by="name" class="elevation-1" v-model="selected" show-select>
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-toolbar-title>{{ toolBarTitle }}</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <template v-if='userExistFlag'>
          <v-btn icon @click="queryNonRole">
            <v-icon>remove_circle_outline</v-icon>
          </v-btn>
          <v-btn icon @click="saveUserRoleBatch">
            <v-icon>check</v-icon>
          </v-btn>
        </template>
        <v-dialog v-model="dialog" max-width="500px">
          <!-- dialog中自定义插槽activator，绑定on方法，on方法控制dialog为true -->
          <template v-if='!userExistFlag' v-slot:activator="{ on }">
            <v-btn icon v-on="on">
              <v-icon>remove_circle_outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedItem.name" label="角色名"></v-text-field>
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
      <a href="javascript:void(0);" @click="findPermission(item)">{{item.name}}</a>
    </template>
    <template v-slot:item.id>
    </template>
    <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template> -->
  </v-data-table>
</template>

<script src='./role.js'></script>