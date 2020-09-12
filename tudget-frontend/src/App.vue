<template>
  <div id="app">
    <div id="nav">
      <div class="columns">
        <div class="column mt-6 pl-6 is-one-fifth">
          <h3 class="title is-primary">Tudget</h3>
          <ul>
            <li>
              <router-link to="/" class="has-text-weight-semibold"
                >Home</router-link
              >
            </li>
            <li>
              <router-link to="/about" class="has-text-weight-semibold"
                >About</router-link
              >
            </li>
          </ul>
        </div>
        <div class="column mt-6">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
