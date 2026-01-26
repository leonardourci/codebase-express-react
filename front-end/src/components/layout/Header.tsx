import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/useAuth'
import { Menu, X, LogOut, User } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { SignupForm } from '@/components/auth/SignupForm'

interface HeaderProps {
    onMenuToggle?: () => void
    showMenuButton?: boolean
}

export function Header({ onMenuToggle, showMenuButton = false }: HeaderProps) {
    const { user, logout, isAuthenticated } = useAuth()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isSignupOpen, setIsSignupOpen] = useState(false)

    const handleLogout = async () => {
        await logout()
        setIsMobileMenuOpen(false)
    }

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Left side - Logo and menu button */}
                    <div className="flex items-center space-x-4">
                        {showMenuButton && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={onMenuToggle}
                                className="lg:hidden"
                                aria-label="Toggle sidebar"
                            >
                                <Menu className="h-5 w-5" />
                            </Button>
                        )}

                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-sm">
                                <span className="text-primary-foreground font-bold text-sm">A</span>
                            </div>
                            <span className="font-semibold text-lg hidden sm:block">App Name</span>
                        </Link>
                    </div>

                    {/* Desktop navigation */}
                    <nav className="hidden md:flex items-center space-x-4">
                        <Link to="/pricing">
                            <Button variant="ghost" size="sm">
                                Pricing
                            </Button>
                        </Link>

                        {isAuthenticated ? (
                            <>
                                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                                    <User className="h-4 w-4" />
                                    <span>{user?.fullName || user?.email}</span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleLogout}
                                    className="flex items-center space-x-2"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">
                                        Sign In
                                    </Button>
                                </Link>

                                <Popover open={isSignupOpen} onOpenChange={setIsSignupOpen}>
                                    <PopoverTrigger asChild>
                                        <Button size="sm" className="shadow-sm">
                                            Sign Up
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-80 p-0 border-none bg-transparent shadow-none" align="end">
                                        <div className="bg-popover border border-border rounded-lg shadow-lg p-4">
                                            <SignupForm onSuccess={() => setIsSignupOpen(false)} />
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={toggleMobileMenu}
                        className="md:hidden"
                        aria-label="Toggle mobile menu"
                    >
                        {isMobileMenuOpen ? (
                            <X className="h-5 w-5" />
                        ) : (
                            <Menu className="h-5 w-5" />
                        )}
                    </Button>
                </div>

                {/* Mobile navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden border-t border-border py-4 bg-background/95 backdrop-blur">
                        <nav className="flex flex-col space-y-2">
                            <Link to="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                                <Button variant="ghost" className="w-full justify-start">
                                    Pricing
                                </Button>
                            </Link>
                            {isAuthenticated ? (
                                <>
                                    <div className="flex items-center space-x-2 px-3 py-2 text-sm text-muted-foreground">
                                        <User className="h-4 w-4" />
                                        <span>{user?.fullName || user?.email}</span>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        onClick={handleLogout}
                                        className="justify-start"
                                    >
                                        <LogOut className="h-4 w-4 mr-2" />
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button variant="ghost" className="w-full justify-start">
                                            Sign In
                                        </Button>
                                    </Link>
                                    <Link to="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full justify-start">
                                            Sign Up
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                )}
            </div>
        </header>
    )
}
