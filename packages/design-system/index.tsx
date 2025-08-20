import type { ThemeProviderProps } from 'next-themes';
import { Toaster } from './components/ui/sonner';
import { TooltipProvider } from './components/ui/tooltip';
import { ThemeProvider } from './providers/theme';

type DesignSystemProviderProperties = ThemeProviderProps & {
  privacyUrl?: string;
  termsUrl?: string;
  helpUrl?: string;
};

export const DesignSystemProvider = ({
  children,
  ...properties
}: DesignSystemProviderProperties) => (
  <ThemeProvider {...properties}>
    <TooltipProvider>{children}</TooltipProvider>
    <Toaster />
  </ThemeProvider>
);

// Export UI components
export { Button } from './components/ui/button';
export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
export { Input } from './components/ui/input';
export { Label } from './components/ui/label';
export { Textarea } from './components/ui/textarea';
export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
export { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './components/ui/dialog';
export { Alert, AlertDescription, AlertTitle } from './components/ui/alert';
export { Badge } from './components/ui/badge';
export { Checkbox } from './components/ui/checkbox';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export { Switch } from './components/ui/switch';
export { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
export { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './components/ui/accordion';
export { Avatar, AvatarFallback, AvatarImage } from './components/ui/avatar';
export { Calendar } from './components/ui/calendar';
export { Popover, PopoverContent, PopoverTrigger } from './components/ui/popover';
export { Command, CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, CommandShortcut } from './components/ui/command';
export { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './components/ui/dropdown-menu';
export { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from './components/ui/form';
export { HoverCard, HoverCardContent, HoverCardTrigger } from './components/ui/hover-card';
export { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarShortcut, MenubarTrigger } from './components/ui/menubar';
export { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from './components/ui/navigation-menu';
export { Progress } from './components/ui/progress';
export { ScrollArea, ScrollBar } from './components/ui/scroll-area';
export { Separator } from './components/ui/separator';
export { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from './components/ui/sheet';
export { Skeleton } from './components/ui/skeleton';
export { Slider } from './components/ui/slider';
export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow } from './components/ui/table';
export { Toggle } from './components/ui/toggle';
export { ToggleGroup, ToggleGroupItem } from './components/ui/toggle-group';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';

// Export lib utilities
export { cn } from './lib/utils';
export { fonts } from './lib/fonts';

// Export hooks
export { useIsMobile } from './hooks/use-mobile';

// Export providers
export { ThemeProvider } from './providers/theme';
