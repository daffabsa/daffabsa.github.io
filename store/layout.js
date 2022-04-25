export const state = () => ({
  layoutType: "horizontal",
  layoutWidth: "fluid",
  leftSidebarType: "light",
  leftSidebarSize: "default",
  menuPosition: "fixed",
  topbar: "dark",
  loader: false,
  _list1: ["SkorRoe", "EfisiensiPenagihan"],
  _list2: ["Maps"],
  _list3: ["EfisiensiPenagihanSaatIni"],
  list1: ["SkorRoe", "EfisiensiPenagihan"],
  list2: ["Maps"],
  list3: ["EfisiensiPenagihanSaatIni"],
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

  saveBeforeList1 (state, list1) {
    state._list1 = list1;
  },
  saveBeforeList2 (state, list2) {
    state._list2 = list2;
  },
  saveBeforeList3 (state, list3) {
    state._list3 = list3;
  },

  saveList1 (state, list) {
    state.list1 = list;
  },

  saveList2 (state, list) {
    state.list2 = list;
  },

  saveList3 (state, list) {
    state.list3 = list;
  },

  addList1(state, item){
    state.list1.push(item);
  },

  addList2(state, item){
    state.list2.push(item);
  },

  addList3(state, item){
    state.list3.push(item);
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

  saveList1Position({ commit }, { list }) {
    commit("saveList1", list);
  },

  saveList2Position({ commit }, { list }) {
    commit("saveList2", list);
  },

  saveList3Position({ commit }, { list }) {
    commit("saveList3", list);
  },

  addListData1({ commit }, { item }) {
    commit("addList1", item);
  },

  addListData2({ commit }, { item }) {
    commit("addList2", item);
  },

  addListData3({ commit }, { item }) {
    commit("addList3", item);
  },

  saveBeforeListPosition1({ commit }, { list1 }) {
    commit("saveBeforeList1", list1);
  },

  saveBeforeListPosition2({ commit }, { list2 }) {
    commit("saveBeforeList2", list2);
  },

  saveBeforeListPosition3({ commit }, { list3 }) {
    commit("saveBeforeList3", list3);
  }
};

// export { state, mutations, actions };