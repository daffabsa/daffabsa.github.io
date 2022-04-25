export const state = () => ({
  layoutType: "horizontal",
  layoutWidth: "fluid",
  leftSidebarType: "light",
  leftSidebarSize: "default",
  menuPosition: "fixed",
  topbar: "dark",
  loader: false,
  datalist: {
    _list1: ["SkorRoe", "EfisiensiPenagihan"],
    _list2: ["Maps"],
    _list3: ["EfisiensiPenagihanSaatIni"],
    list1: ["SkorRoe", "EfisiensiPenagihan"],
    list2: ["Maps"],
    list3: ["EfisiensiPenagihanSaatIni"],
  }
});

export const mutations = {
  CHANGE_LAYOUT(state, layoutType) {
    state.layoutType = layoutType;
  },
  CHANGE_LAYOUT_WIDTH(state, layoutWidth) {
    state.layoutWidth = layoutWidth;
  },
  CHANGE_LEFT_SIDEBAR_TYPE(state, leftSidebarType) {
    state.leftSidebarType = leftSidebarType;
  },
  CHANGE_LEFT_SIDEBAR_SIZE(state, leftSidebarSize) {
    state.leftSidebarSize = leftSidebarSize;
  },
  CHANGE_TOPBAR(state, topbar) {
    state.topbar = topbar;
  },
  LOADER(state, loader) {
    state.loader = loader;
  },
  CHANGE_POSITION(state, menuPosition) {
    state.menuPosition = menuPosition;
  },

  saveList(state, {key, list}){
    state.datalist[key] = list;
  },

  addList(state, {key, item}){
    if (state.datalist[key].indexOf(item) < 0) {
      state.datalist[key].push(item);
    } else {
      alert('widget sudah ada');
    }
  },

  removeList(state, {key, index}){
    state.datalist[key].splice(index, 1);
  }
};

export const actions = {
  changeLayoutType({ commit }, { layoutType }) {
    commit("CHANGE_LAYOUT", layoutType);
  },

  changeLayoutWidth({ commit }, { layoutWidth }) {
    commit("CHANGE_LAYOUT_WIDTH", layoutWidth);
  },

  changeLeftSidebarType({ commit }, { leftSidebarType }) {
    commit("CHANGE_LEFT_SIDEBAR_TYPE", leftSidebarType);
  },

  changeLeftSidebarSize({ commit }, { leftSidebarSize }) {
    commit("CHANGE_LEFT_SIDEBAR_SIZE", leftSidebarSize);
  },

  changeTopbar({ commit }, { topbar }) {
    commit("CHANGE_TOPBAR", topbar);
  },

  changeLoaderValue({ commit }, { loader }) {
    commit("LOADER", loader);
  },

  changeMenuPosition({ commit }, { menuPosition }) {
    commit("CHANGE_POSITION", menuPosition);
  },

  savePositionList({ commit }, { key, list }) {
    commit("saveList", {key, list});
  },

  addItemList({ commit }, { key, item }) {
    commit("addList", {key, item});
  },

  removeItemList({ commit }, { key, index, item }) {
    commit("removeList", {key, index, item});
  },
};

// export { state, mutations, actions };