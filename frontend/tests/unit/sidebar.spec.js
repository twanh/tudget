import { mount, createLocalVue } from "@vue/test-utils";

import SideBar from "@/components/Sidebar.vue";
import Buefy from 'buefy'


const localVue = createLocalVue();
localVue.use(Buefy)

describe("Sidebar.vue", () => {


    // Logged out
    // Show register and login buttons when logged out
    it("should show the register and login buttons when logged out", () =>  {
        const wrapper = mount(SideBar, {
            localVue,
            mocks: {
                // Make sure the current route is available 
                $route: {name: ""}
            },
            computed: {
                loggedIn(){
                    return false;
                }
            }
        })

        const buttons = wrapper.findAllComponents({name: 'b-menu-item'})
        expect(buttons.at(0).text()).toEqual("Login")
        expect(buttons.at(1).text()).toEqual("Register")
    })
    //  Todo: Should redirect on click    

        
    // Logged in
    it('should highlight the correct (active) route ', () => {
        const wrapper = mount(SideBar, {
            localVue,
            mocks: {
                $route: {name: "Dashboard"} // Sets the route name to Dashbaord
            },
            computed: {
                loggedIn(){
                    return true;
                }
            }
        })

        const dashBoardButton = wrapper.findComponent({name: 'b-menu-item'})
        // Expects the dasboard button to be active
        expect(dashBoardButton.props()).toHaveProperty('active', true);
        // Expect other button to not be active
        const accountsButton = wrapper.findAllComponents({name: 'b-menu-item'}).at(1)
        expect(accountsButton.props()).toHaveProperty('active', false)
    });
    // Show logout button
    it('should show the logout button when logged in', () => {
        const wrapper = mount(SideBar, {
            localVue,
            mocks: {
                $route: {name: "Dashboard"} // Sets the route name to Dashbaord
            },
            computed: {
                loggedIn(){
                    return true;
                }
            }
        })

        // Select the logout button (the last button)
        const logoutButton = wrapper.findAllComponents({name: "b-menu-item"}).at(-1)
        expect(logoutButton.text()).toEqual('Logout')
    });
    // TODO: Test Redirect to the correct route on click

});
