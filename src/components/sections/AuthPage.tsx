import { useState } from "react";
import phoenixHero from "@/assets/phoenix-gold.jpg";

const AuthPage = ({ onClose }: { onClose: () => void }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = `https://aaruke-shop.myshopify.com/api/2024-01/graphql.json`;
    const headers = {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": "9ef6a69f9a3fb8940291c3cd87cace38",
    };

    try {
      if (isLogin) {
        const loginQuery = `
          mutation customerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
            customerAccessTokenCreate(input: $input) {
              customerAccessToken { accessToken expiresAt }
              customerUserErrors { message }
            }
          }
        `;
        
        const response = await fetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: loginQuery,
            variables: { input: { email, password } }
          }),
        });

        const responseJson = await response.json();
        
        if (!response.ok || responseJson.errors) {
          console.error("Shopify Request Failed:", responseJson);
          alert("Connection refused. Please check your network or API token.");
          setIsLoading(false);
          return; 
        }

        const { data } = responseJson;
        const errors = data.customerAccessTokenCreate.customerUserErrors;

        if (errors && errors.length > 0) {
          alert(errors[0].message); 
        } else {
          const token = data.customerAccessTokenCreate.customerAccessToken.accessToken;
          localStorage.setItem("aaruke_token", token);
          window.dispatchEvent(new Event("auth_change"));
          alert("Successfully logged in!");
          onClose(); 
        }

      } else {
        const signUpQuery = `
          mutation customerCreate($input: CustomerCreateInput!) {
            customerCreate(input: $input) {
              customer { id }
              customerUserErrors { message }
            }
          }
        `;

        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts[0];
        const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : ".";

        const response = await fetch(endpoint, {
          method: "POST",
          headers,
          body: JSON.stringify({
            query: signUpQuery,
            variables: { input: { email, password, firstName, lastName } }
          }),
        });

        const responseJson = await response.json();
        
        if (!response.ok || responseJson.errors) {
          console.error("Shopify Request Failed:", responseJson);
          alert("Connection refused. Please check your network or API token.");
          setIsLoading(false);
          return; 
        }

        const { data } = responseJson;
        const errors = data.customerCreate.customerUserErrors;

        if (errors && errors.length > 0) {
          alert(errors[0].message);
        } else {
          alert("Account created! Please sign in with your new password.");
          setIsLogin(true);
          setPassword(""); 
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      alert("Something went wrong connecting to the server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="fixed inset-0 z-[100] bg-[#050707]/90 backdrop-blur-md overflow-hidden font-sans p-4 text-ivory flex items-center justify-center">
      
      <button 
        onClick={onClose} 
        className="fixed top-4 right-4 md:top-6 md:right-6 text-ivory/60 hover:text-white tracking-widest uppercase text-[10px] transition-colors z-[110] bg-black/50 px-3 py-2 rounded-lg"
      >
        Close ✕
      </button>

      {/* 1. Shrunk max-w to 750px and strictly locked height to 480px */}
      <div className="w-full max-w-[750px] md:h-[480px] max-h-[90vh] bg-[#0a0c0c] border border-white/10 rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative">
        
        <div className="hidden md:flex md:w-5/12 relative bg-[#050707] items-end p-6 md:p-8 overflow-hidden">
          <img 
            src={phoenixHero} 
            alt="Aaruké Phoenix" 
            className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity hover:mix-blend-normal hover:opacity-60 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050707] via-[#050707]/80 to-transparent"></div>
          
          <div className="relative z-10 w-full">
            <h1 className="font-serif font-light text-xl text-ivory uppercase tracking-wide mb-2">
              Aarukè
            </h1>
            <p className="text-[9px] tracking-widest text-[#c5a059] uppercase mb-1">
              You can easily
            </p>
            <h2 className="font-serif text-xl leading-tight font-light text-ivory">
              Get access to your personal hub for clarity and <span className="italic text-[#c5a059]">rebirth</span>.
            </h2>
          </div>
        </div>

        {/* 2. REMOVED overflow-y-auto completely. It is now impossible for a scrollbar to appear here. */}
        <div className="w-full md:w-7/12 p-6 md:p-7 flex flex-col justify-center">
          
          <div className="md:hidden mb-3 text-center">
             <h1 className="font-serif font-semibold text-lg text-gold uppercase tracking-widest">
              Aarukè
            </h1>
          </div>

          <div className="mb-3">
            <h3 className="text-lg font-serif mb-1">
              {isLogin ? "Sign In to your Portal" : "Create an account"}
            </h3>
            <p className="text-[10px] text-ivory/60 font-light leading-snug">
              {isLogin 
                ? "Access your exclusive Spirit Animal details and bespoke orders."
                : "Join the circle. Access your tasks, notes, and exclusive drops anytime."}
            </p>
          </div>

          {/* 3. Tighter space-y-2.5 */}
          <form className="space-y-2.5" onSubmit={handleAuthSubmit}>
            
            {!isLogin && (
              <div className="space-y-1">
                <label className="text-[8px] tracking-widest uppercase text-ivory/80">Full Name</label>
                {/* 4. Tighter input padding (py-1.5) and text-size (text-[11px]) */}
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={!isLogin}
                  placeholder="Ashok Kumar"
                  className="w-full bg-transparent border border-white/10 rounded-md px-3 py-1.5 text-[11px] text-ivory focus:border-[#c5a059] focus:outline-none transition-colors placeholder:text-ivory/20"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[8px] tracking-widest uppercase text-ivory/80">Email Address</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="ashok.kumar@example.com"
                className="w-full bg-transparent border border-white/10 rounded-md px-3 py-1.5 text-[11px] text-ivory focus:border-[#c5a059] focus:outline-none transition-colors placeholder:text-ivory/20"
              />
            </div>

            <div className="space-y-1">
              <label className="text-[8px] tracking-widest uppercase text-ivory/80">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full bg-transparent border border-white/10 rounded-md px-3 py-1.5 text-[11px] text-ivory focus:border-[#c5a059] focus:outline-none transition-colors placeholder:text-ivory/20 tracking-widest"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-ivory/40 hover:text-[#c5a059] tracking-widest uppercase transition-colors"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end pt-0.5">
                <a href="#" className="text-[9px] text-ivory/60 hover:text-[#c5a059] tracking-widest uppercase transition-colors">
                  Forgot Password?
                </a>
              </div>
            )}

            {/* Shrunk button padding */}
            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#c5a059] text-black py-2 rounded-md text-[10px] tracking-[0.2em] uppercase font-bold hover:bg-[#d4af37] transition-all active:scale-[0.98] mt-1 disabled:opacity-50 disabled:cursor-wait"
            >
              {isLoading ? "Verifying..." : (isLogin ? "Sign In" : "Get Started")}
            </button>
          </form>

          {/* Social login margins shrunk to mt-3 */}
          <div className="mt-3">
            <div className="relative flex items-center mb-2">
              <div className="flex-grow border-t border-white/10"></div>
              <span className="flex-shrink-0 mx-3 text-[8px] text-ivory/40 tracking-widest uppercase">
                or continue with
              </span>
              <div className="flex-grow border-t border-white/10"></div>
            </div>

            <div className="grid grid-cols-1">
              <button className="flex justify-center items-center py-1.5 border border-white/10 rounded-md hover:bg-white/5 transition-colors">
                <span className="text-[11px] font-serif">G</span>
              </button>
            </div>
          </div>

          <p className="text-center mt-3 text-[10px] text-ivory/60 tracking-wide">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button 
              onClick={() => {
                setIsLogin(!isLogin);
                setPassword(""); 
              }}
              className="text-[#c5a059] hover:text-white transition-colors ml-1 font-medium"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>

        </div>
      </div>
    </section>
  );
};

export default AuthPage;