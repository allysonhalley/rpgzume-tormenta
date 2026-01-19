
def main():
    # Mojibake for "Projéteis" seen in failure log: "Proj├®teis"
    # ├ = \u251c
    # ® = \u00ae
    bad_str = "Proj\u251c\u00aeteis" 
    print(f"Bad string: {bad_str}")
    
    try:
        # Try CP437 (Expected to fail)
        print("Trying CP437...")
        bytes_437 = bad_str.encode('cp437')
        print(f"CP437 bytes: {bytes_437.hex()}")
    except Exception as e:
        print(f"CP437 failed: {e}")

    try:
        # Try CP850 (Expected to succeed)
        print("Trying CP850...")
        bytes_850 = bad_str.encode('cp850')
        print(f"CP850 bytes: {bytes_850.hex()}")
        
        # Decode as UTF-8
        fixed = bytes_850.decode('utf-8')
        print(f"Decoded UTF-8: {fixed}")
        
        if fixed == "Projéteis":
            print("SUCCESS! CP850 is the correct source encoding.")
        else:
            print("Decoded string does not match expectation.")
            
    except Exception as e:
        print(f"CP850 failed: {e}")

if __name__ == "__main__":
    main()
