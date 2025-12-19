import { Routes } from '@angular/router';
import UserProfile from './pages/components/user-profile/user-profile.component';
import TaskManagementList from './pages/components/task-management-list/task-management-list.component';

export const routes: Routes = [
    {
        path: '',
        component: TaskManagementList
    },
    {
        path: 'user',
        component: UserProfile
    }
];
