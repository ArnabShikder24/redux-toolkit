import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '../components/ui/avatar';
import { Button } from '../components/ui/button';
import { DropdownMenuSeparator } from '../components/ui/dropdown-menu';
import { DropdownMenuLabel } from '../components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../components/ui/dropdown-menu';
import { HiOutlineSearch } from 'react-icons/hi';
import Cart from '../components/Cart';
import logo from '../assets/images/technet-logo.png';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { toast } from '@/components/ui/use-toast';
import { setUser } from '@/redux/feature/user/userSlice';

export default function Navbar() {
  const { user: { email } } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    console.log("Logout");
    signOut(auth).then(() => {
      dispatch(setUser(null))
      toast({
        description: 'Logout successfully',
      });
    }).catch((error) => {
      toast({
        description: `try again, ${error}`,
      });
    });
  }

  return (
    <nav className="w-full h-16 fixed top backdrop-blur-lg z-10">
      <div className="h-full w-full bg-white/60">
        <div className="flex items-center justify-between w-full md:max-w-7xl h-full mx-auto ">
          <div>
            <Link to='/'>
              <img className="h-8" src={logo} alt="log" />
            </Link>
          </div>
          <div>
            <ul className="flex items-center">
              <li>
                <Button variant="link" asChild>
                  <Link to="/">Home</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" asChild>
                  <Link to="/products">Products</Link>
                </Button>
              </li>
              {
                email && 
                <li>
                  <Button variant="link" asChild>
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                </li>
              }
              {
                !email &&
                <>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/login">Login</Link>
                    </Button>
                  </li>
                  <li>
                    <Button variant="link" asChild>
                      <Link to="/signup">Sign Up</Link>
                    </Button>
                  </li>
                </>
              }
              <li>  
                <Button variant="ghost">
                  <HiOutlineSearch size="25" />
                </Button>
              </li>
              <li>
                <Cart />
              </li>
              {
                email &&
                <li className="ml-5">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="outline-none">
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Account</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="cursor-pointer">
                        Profile
                      </DropdownMenuItem>
                      {
                        email && 
                        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                          Logout
                        </DropdownMenuItem>
                      }
                    </DropdownMenuContent>
                  </DropdownMenu>
                </li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
