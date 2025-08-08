import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Event,
  Payment,
  People,
  MedicalServices,
  Settings,
  AccountCircle,
  Logout,
  Assessment,
} from '@mui/icons-material';
import amscLogo from '@/assets/amsc-logo.png';
import { amscTheme } from '@/theme/muiTheme';

const drawerWidth = 280;

interface AdminLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout: () => void;
}

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { id: 'appointments', label: 'Appointments', icon: <Event />, path: '/appointments' },
  { id: 'billing', label: 'Billing & Invoices', icon: <Payment />, path: '/billing' },
  { id: 'revenue', label: 'Revenue Tracking', icon: <Assessment />, path: '/revenue' },
  { id: 'patients', label: 'Patient Log', icon: <People />, path: '/patients' },
  { id: 'services', label: 'Services Management', icon: <MedicalServices />, path: '/services' },
  { id: 'settings', label: 'Settings', icon: <Settings />, path: '/settings' },
];

const AdminLayout: React.FC<AdminLayoutProps> = ({ 
  children, 
  activeTab, 
  onTabChange, 
  onLogout 
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  // Get current active tab based on the current route
  const getCurrentTab = () => {
    const currentPath = location.pathname;
    const activeItem = menuItems.find(item => currentPath.startsWith(item.path));
    return activeItem?.id || 'dashboard';
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    onLogout();
  };

  const drawer = (
    <Box>
      {/* Logo and Clinic Name */}
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <img 
          src={amscLogo} 
          alt="AMSC Logo" 
          style={{ 
            width: 60, 
            height: 60, 
            marginBottom: 8,
            objectFit: 'contain'
          }} 
        />
        <Typography variant="h6" sx={{ fontWeight: 600, color: 'primary.main' }}>
          AMSC Admin
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Advanced Multi Specialty Clinic
        </Typography>
      </Box>

      <Divider />

      {/* Navigation Menu */}
      <List sx={{ px: 2, py: 1 }}>
        {menuItems.map((item) => {
          const isCurrentlyActive = getCurrentTab() === item.id;
          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isCurrentlyActive}
                onClick={() => {
                  navigate(item.path);
                  onTabChange(item.id);
                  if (isMobile) {
                    setMobileOpen(false);
                  }
                }}
                sx={{
                  borderRadius: 2,
                  '&.Mui-selected': {
                    backgroundColor: 'primary.main',
                    color: 'primary.contrastText',
                    '&:hover': {
                      backgroundColor: 'primary.dark',
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.contrastText',
                    },
                  },
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.label} 
                  primaryTypographyProps={{
                    fontSize: '0.9rem',
                    fontWeight: isCurrentlyActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* App Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h5" noWrap component="div" sx={{ flexGrow: 1, color: amscTheme.palette.primary.main, fontWeight: 'bold' }} id="app-title">
            {menuItems.find(item => item.id === getCurrentTab())?.label || 'AMSC Admin Portal'}
          </Typography>
          
          {/* Profile Menu */}
          <IconButton
            size="large"
            edge="end"
            aria-label="account menu"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle sx={{ color: 'text.primary' }} />
          </IconButton>
          
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleProfileMenuClose}>
              <Avatar sx={{ width: 24, height: 24, mr: 2 }} />
              Admin User
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Navigation Drawer */}
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          variant={isMobile ? 'temporary' : 'permanent'}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          minHeight: '100vh',
          backgroundColor: 'background.default',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default AdminLayout;