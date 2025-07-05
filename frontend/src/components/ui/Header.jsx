import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Upload',
      path: '/mri-upload-dashboard',
      icon: 'Upload',
      tooltip: 'Upload MRI scans for analysis'
    },
    {
      label: 'Results',
      path: '/analysis-results-display',
      icon: 'Activity',
      tooltip: 'View current analysis results'
    },
    {
      label: 'History',
      path: '/analysis-history-archive',
      icon: 'Archive',
      tooltip: 'Access analysis history and archives'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-1000 bg-surface border-b border-border clinical-shadow">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary-foreground"
              >
                <path
                  d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V21C3 22.11 3.89 23 5 23H19C20.11 23 21 22.11 21 21V9M19 9H14V4H19V9ZM12 15C13.66 15 15 13.66 15 12S13.66 9 12 9 9 10.34 9 12 10.34 15 12 15ZM12 17C9.79 17 8 18.79 8 21H16C16 18.79 14.21 17 12 17Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-text-primary font-heading">
                NeuroScan AI
              </h1>
              <p className="text-sm text-text-secondary font-caption">
                Medical Brain Tumor Analysis
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  relative flex items-center space-x-2 px-6 py-3 rounded-md
                  transition-all duration-200 ease-out focus-ring
                  ${
                    isActivePath(item.path)
                      ? 'bg-primary-50 text-primary-600 border-b-2 border-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                  }
                `}
                title={item.tooltip}
                aria-label={item.tooltip}
              >
                <Icon 
                  name={item.icon} 
                  size={18} 
                  className={isActivePath(item.path) ? 'text-primary-600' : 'text-current'} 
                />
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* User Profile Section */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-text-primary">Dr. Sarah Chen</p>
                <p className="text-xs text-text-secondary">Radiologist</p>
              </div>
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Icon name="User" size={20} className="text-primary-600" />
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-md text-text-secondary hover:text-text-primary hover:bg-secondary-50 focus-ring"
            aria-label="Toggle mobile menu"
          >
            <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={24} />
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-border">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`
                    w-full flex items-center space-x-3 px-4 py-3 rounded-md text-left
                    transition-all duration-200 ease-out focus-ring
                    ${
                      isActivePath(item.path)
                        ? 'bg-primary-50 text-primary-600 border-l-4 border-primary-600' :'text-text-secondary hover:text-text-primary hover:bg-secondary-50'
                    }
                  `}
                  title={item.tooltip}
                >
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={isActivePath(item.path) ? 'text-primary-600' : 'text-current'} 
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </nav>
            
            {/* Mobile User Profile */}
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-3 px-4 py-3">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <Icon name="User" size={20} className="text-primary-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">Dr. Sarah Chen</p>
                  <p className="text-xs text-text-secondary">Radiologist</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;